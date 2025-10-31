import { AiParsedFilters } from "../../domain/repositories/IProductRepository"
import { openAiClient } from "../../infra/openai/client"

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
      const response = await openAiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0
      })

      const parsed = JSON.parse(response.choices[0].message.content || '{}')

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