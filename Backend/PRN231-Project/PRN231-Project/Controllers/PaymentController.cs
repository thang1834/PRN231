using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Dto.Payment;
using PRN231_Project.Services;

namespace PRN231_Project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : Controller
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPaymentsAsync()
        {
            var payments = await _paymentService.GetAllPaymentsAsync();
            return Ok(payments);
        }
        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetPaymentsByUserIdAsync(int userId)
        {
            try
            {
                var payments = await _paymentService.GetPaymentsByUserIdAsync(userId);
                return Ok(payments);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("{paymentId}")]
        public async Task<IActionResult> GetPaymentByIdAsync(int paymentId)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(paymentId);
            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }

        [HttpPost]
        public async Task<IActionResult> AddPaymentAsync([FromBody] PaymentCreateDto paymentDto)
        {
            try
            {
                var payment = await _paymentService.AddPaymentAsync(paymentDto);
                return Ok(payment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{paymentId}")]
        public async Task<IActionResult> UpdatePaymentAsync(int paymentId, [FromBody] PaymentUpdateDto paymentDto)
        {
            try
            {
                var result = await _paymentService.UpdatePaymentAsync(paymentId, paymentDto);
                if (result == null)
                {
                    return NotFound($"No payment found with ID {paymentId}");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{paymentId}")]
        public async Task<IActionResult> RemovePaymentAsync(int paymentId)
        {
            try
            {
                var result = await _paymentService.RemovePaymentAsync(paymentId);
                if (!result)
                {
                    return NotFound($"No payment found with ID {paymentId}");
                }

                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
