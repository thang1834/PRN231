using System;
using System.Collections.Generic;
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
        private readonly IPaymentService _PaymentService;

        public PaymentController(IPaymentService PaymentService)
        {
            _PaymentService = PaymentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPaymentsAsync()
        {
            var Payments = await _PaymentService.GetAllPaymentsAsync();
            return Ok(Payments);
        }

        [HttpGet("{PaymentId}")]
        public async Task<IActionResult> GetPaymentByIdAsync(int PaymentId)
        {
            var Payment = await _PaymentService.GetPaymentByIdAsync(PaymentId);
            if (Payment == null)
            {
                return NotFound();
            }

            return Ok(Payment);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetPaymentsByUserIdAsync(int userId)
        {
            var Payments = await _PaymentService.GetPaymentsByUserIdAsync(userId);
            return Ok(Payments);
        }


        [HttpPost]
        public async Task<IActionResult> CreatePaymentAsync([FromBody] PaymentCreateDto PaymentDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var Payment = await _PaymentService.CreatePaymentAsync(PaymentDto);
                    return Ok(Payment);
                }
                return BadRequest("ModelState is not valid");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("{PaymentId}")]
        public async Task<IActionResult> UpdatePaymentAsync(int PaymentId,  PaymentUpdateDto PaymentDto)
        {
            try
            {
                await _PaymentService.UpdatePaymentAsync(PaymentId, PaymentDto);
                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{PaymentId}")]
        public async Task<IActionResult> RemovePaymentAsync(int PaymentId)
        {
            try
            {
                await _PaymentService.RemovePaymentAsync(PaymentId);
                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}