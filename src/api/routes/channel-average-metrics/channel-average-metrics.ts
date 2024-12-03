import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod";
import { getMetricsByPeriod } from "./utils/get-metrics-average";
import { channelRequestParamsSchema } from "./utils/schemas";
import { querySchema } from "../channels-metrics/utils/schemas";
import { filterByAverageMetric } from "./utils/filter-by-average-metric";

export const getChannelAverageMetrics = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { metric, startDate, endDate } = querySchema.parse(request.query);
    const { period, channel_id } = channelRequestParamsSchema.parse(request.params);
    
    const metricsAverage = await getMetricsByPeriod({ period, startDate, endDate, channel_id })

    let metricsResponseData = metricsAverage
    
    if (metric) {
      metricsResponseData = filterByAverageMetric(metric, metricsResponseData)
    }

    return reply.code(200).send({
      metrics: metricsResponseData
    })
  } catch(error) {
    console.error(error)

    if (error instanceof ZodError) {
      return reply.code(500).send({ error: 'Internal Server Error', message: error.message })
    }

    return reply.code(500).send({ error: 'Internal Server Error' })
  }
}
