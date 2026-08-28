using System.Text.Json;

namespace backend.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;

        public ExceptionMiddleware(
            RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(
            HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                context.Response.StatusCode = 500;

                context.Response.ContentType =
                    "application/json";

                var result = JsonSerializer.Serialize(
                    new
                    {
                        success = false,
                        message = ex.Message
                    });

                await context.Response.WriteAsync(result);
            }
        }
    }
}