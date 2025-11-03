import { AiParsedFilters } from "../../domain/repositories/IAiSearchLogRepository";
import { ListProductFilters } from "../../domain/repositories/IProductRepository"
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import client from "../../infra/openai/client"
import { normalizeText } from "../../utils/format-texts";
import { AiSearchLogService } from "./ai-product-search-log.service";

export class AiProductSearchService { 
  constructor(
    private aiSearchLogService: AiSearchLogService,
    private userRepository: IUserRepository,
  ){}

  async parseQuery(
    query: string, 
    options: { page?: number; limit?: number } = {},
    userId?: string
  ): Promise<ListProductFilters> {
    if (!query.trim()) {
      return {
        search: query,
        page: options.page,
        limit: options.limit,
        interpretation: 'Busca vazia'
      }
    }

    const cleanQuery = normalizeText(query)
    const prompt = `
      Você é um assistente que converte pesquisas de usuários em filtros de produtos.
      Analise o texto e extraia:
      - category: categoria do produto (se mencionada)
      - priceMin: preço mínimo (se mencionado)
      - priceMax: preço máximo (se mencionado)
      - search: termos de busca principais

      Se não conseguir extrair algum campo, coloque null.
      Responda APENAS em JSON válido.

      Exemplo de saída:
      { "category": "doces", "priceMin": null, "priceMax": 50, "search": "doces" }

      Texto do usuário: "${cleanQuery}"
    `.trim()

    try {
      const response = await client.chat({
        model: 'gpt-oss:120b',
        messages: [{ role: 'user', content: prompt }],
        stream: false,
        format: 'json'
      })

      const content = response.message.content.trim()
      const parsed = JSON.parse(content)

      const filters: AiParsedFilters = {
        category: parsed.category || undefined,
        priceMin: parsed.priceMin != null ? Number(parsed.priceMin) : undefined,
        priceMax: parsed.priceMax != null ? Number(parsed.priceMax) : undefined,
        search: parsed.search || query,
        page: options.page,
        limit: options.limit,
        interpretation: this.generateInterpretation(parsed)
      }

      const currentUser = await this.userRepository.findById(userId || '')
      await this.aiSearchLogService.createLog({
        type: 'AI_SEARCH',
        metadata: {
          query: cleanQuery,
          filters,
          success: true,
          fallbackApplied: false
        },
        userId: currentUser?.id,
        organizationId: currentUser?.organizationId
      })

      return filters

    } catch (error) {
      console.error('Erro na análise por IA:', error)
      const fallbackFilters: AiParsedFilters = {
        search: query,
        page: options.page,
        limit: options.limit,
        interpretation: `Busca simples por "${query}"`
      }
      const currentUser = await this.userRepository.findById(userId || '')
      await this.aiSearchLogService.createLog({
        type: 'AI_SEARCH',
        metadata: {
          query: cleanQuery,
          filters: fallbackFilters,
          success: false,
          fallbackApplied: true
        },
        userId: currentUser?.id,
        organizationId: currentUser?.organizationId
      })

      return fallbackFilters
    }
  }

  private generateInterpretation(parsed: any): string {
    const parts = []
    if (parsed.category) {
      parts.push(`Categoria=${parsed.category}`)
    }
    if (parsed.priceMin && parsed.priceMax) {
      parts.push(`Preço entre R$${parsed.priceMin} e R$${parsed.priceMax}`)
    } else if (parsed.priceMin) {
      parts.push(`Preço ≥ R$${parsed.priceMin}`)
    } else if (parsed.priceMax) {
      parts.push(`Preço ≤ R$${parsed.priceMax}`)
    }
    if (parsed.search && parsed.search !== parsed.category) {
      parts.push(`Busca por "${parsed.search}"`)
    }

    return parts.length > 0 ? parts.join('; ') : 'Busca geral'
  }
}