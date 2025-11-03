import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { LogsService } from '../../application/services/logs.service';
import { LogCreateDTO } from '../../application/dtos/LogCreateDTO';
import { AppError } from '../../shared/errors/app-error';

interface Options {
  logsService: LogsService;
  exclude?: string[];
}

export default fp(async function fastifyLoggingPlugin(
  fastify: FastifyInstance,
  opts: Options
) {
  const { logsService, exclude = ['/logs', '/docs'] } = opts;

  fastify.addHook('onRequest', async (req: FastifyRequest) => {
    (req as any).__startTime = Date.now();
  });

  fastify.addHook('onResponse', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const path = req.routeOptions?.url || req.url;
      if (exclude.some(e => path.startsWith(e))) return;
      const start = (req as any).__startTime || Date.now();
      const latencyMs = Date.now() - start;

      const user = (req as any).user || null;
      const log: LogCreateDTO = {
        userId: user?.sub ?? null,
        route: path,
        method: req.method,
        status: reply.statusCode ?? 0,
        latencyMs,
        payload: {
          query: req.query,
          bodyPreview: previewBody((req as any).body),
          headers: {
            'user-agent': req.headers['user-agent'],
          },
        },
      };
      await logsService.enqueue({
        ...log,
        userId: user?.sub ?? null,
      })

    } catch (error) {
      if (error instanceof AppError) {
        fastify.log.error(error);
      } else {
        fastify.log.error(error);
      }
    }
  });
});

function previewBody(body: any) {
  if (!body) return null;
  const copy = { ...body };
  if (copy.password) delete copy.password;
  const str = JSON.stringify(copy);
  return str.length > 1000 ? str.slice(0, 1000) + '... [TRUNCATED]' : copy;
}
