import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { LogsService } from '../../application/services/logs.service';
import { LogCreateDTO } from '../../application/dtos/LogCreateDTO';
import { AppError } from '../../shared/errors/app-error';

interface Options {
  logsService: LogsService;
}

export default fp(async function (fastify: FastifyInstance, opts: Options) {
  const { logsService } = opts

  fastify.addHook('onRequest', async (req: FastifyRequest, reply: FastifyReply) => {
    (req as any).__startTime = Date.now();
  });

  fastify.addHook('onResponse', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const path = req.routeOptions?.url || req.url;

      const start = (req as any).__startTime || Date.now();
      const latencyMs = Date.now() - start;

      const user = (req as any).user || null;
      const log: LogCreateDTO = {
        userId: user?.id ?? null,
        organizationId: user?.organizationId ?? null,
        route: path,
        method: (req as any).method,
        status: (reply as any).statusCode ?? 0,
        latencyMs: latencyMs,
        payload: {
          query: req.query,
          bodyPreview: previewBody((req as any).body),
          headers: {
            'user-agent': req.headers['user-agent'],
          },
        },
      };

      logsService.enqueue(log);
    } catch (error) {
      if (error instanceof AppError) {
        fastify.log.error(error)
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
