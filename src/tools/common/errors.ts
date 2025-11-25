import { logger } from '../../utils/logger.js';

interface ToolErrorOptions {
  toolName?: string;
}

export const safeHandler = <Handler extends (...args: any[]) => Promise<any>>(
  handler: Handler,
  options?: ToolErrorOptions,
): Handler => {
  const toolName = options?.toolName ?? 'tool';

  const wrapped = async (...args: Parameters<Handler>): Promise<Awaited<ReturnType<Handler>>> => {
    try {
      return await handler(...args);
    } catch (error) {
      logger.error(`Tool ${toolName} failed`, error);
      const message = error instanceof Error ? error.message : 'Unexpected tool error.';
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: message,
          },
        ],
      } as Awaited<ReturnType<Handler>>;
    }
  };

  return wrapped as Handler;
};
