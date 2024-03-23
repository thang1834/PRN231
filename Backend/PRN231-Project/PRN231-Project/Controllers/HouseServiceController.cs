using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Dto.HouseService;
using PRN231_Project.Services;

namespace PRN231_Project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly IHouseServiceService _serviceService;

        public ServiceController(IHouseServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllServicesAsync()
        {
            var services = await _serviceService.GetAllServicesAsync();
            return Ok(services);
        }
        [HttpGet("house/{houseId}")]
        [Authorize]
        public async Task<IActionResult> GetServicesByHouseIdAsync(int houseId)
        {
            var services = await _serviceService.GetServicesByHouseIdAsync(houseId);
            return Ok(services);
        }
        [HttpGet("{serviceId}")]
        [Authorize]
        public async Task<IActionResult> GetServiceByIdAsync(int serviceId)
        {
            var service = await _serviceService.GetServiceByIdAsync(serviceId);
            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateServiceAsync([FromBody] ServiceCreateDto serviceDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var service = await _serviceService.AddServiceAsync(serviceDto);
                    return Ok(service);
                }
                return BadRequest("ModelState is not valid");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{serviceId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateServiceAsync(int serviceId, [FromBody] ServiceUpdateDto serviceDto)
        {
            try
            {
                var result = await _serviceService.UpdateServiceAsync(serviceId, serviceDto);

                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{serviceId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveServiceAsync(int serviceId)
        {
            try
            {
                var result = await _serviceService.RemoveServiceAsync(serviceId);
                if (!result)
                {
                    return NotFound($"No service found with ID {serviceId}");
                }

                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("setService")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SetServiceForHouse([FromBody] HouseServicesDto h)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _serviceService.SetServicesForHouseAsync(h);
                    return Ok(result);
                }
                return BadRequest("ModelState is not valid");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Add more methods here for additional functionalities as needed
    }
}
