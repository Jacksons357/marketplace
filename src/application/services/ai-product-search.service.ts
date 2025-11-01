import { AiParsedFilters } from "../../domain/repositories/IProductRepository"
import client from "../../infra/openai/client"

export class AiProductSearchService {
  async parseQuery(query: string, options: { page?: number, limit?: number}): Promise<AiParsedFilters> {
    if (!query) {
      return {
        page: options.page,
        limit: options.limit,
      }
    }

    const prompt = `
      Você é um assistente que converte pesquisas de usuários em filtros de produtos.
      Campos obrigatórios: category, priceMin, priceMax, search.
      Se não conseguir extrair algum campo, coloque null.
      Exemplo de saída:
      { "category": "doces", "priceMin": null, "priceMax": 50, "search": "doces" }

      Texto do usuário: "${query}"
    `

    try {
      const response = await client.chat({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        stream: false
      })

      const parsed = JSON.parse(response.message.content)

      return {
        category: parsed.category || undefined,
        priceMin: parsed.priceMin != null ? Number(parsed.priceMin) : undefined,
        priceMax: parsed.priceMax != null ? Number(parsed.priceMax) : undefined,
        search: parsed.search || query,
        page: options.page,
        limit: options.limit,
        interpretation: `Categoria=${parsed.category || 'Todas'}; Preço ≤ ${parsed.priceMax || '∞'}`
      }
    } catch (error) {
      return {
        search: query,
        page: options.page,
        limit: options.limit,
        interpretation: `Fallback: busca simples por "${query}"`
      }
    }
  }
}