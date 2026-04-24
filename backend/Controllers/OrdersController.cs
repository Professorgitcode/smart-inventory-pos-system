using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly OrderService _orderService;

    public OrdersController(OrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateOrderDto dto)
    {
        try
        {
            var order = await _orderService.CreateOrder(dto);

            if (order == null)
                return BadRequest("Invalid product");

            return Ok(return Ok(new
{
    message = "Order placed successfully",
    orderId = order.Id
}););
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}