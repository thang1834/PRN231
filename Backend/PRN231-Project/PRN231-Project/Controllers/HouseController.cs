using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Dto.House;
using PRN231_Project.Services;

namespace PRN231_Project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HouseController : Controller
    {
        private readonly IHouseService _houseService;

        public HouseController(IHouseService houseService)
        {
            _houseService = houseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHousesAsync()
        {
            var houses = await _houseService.GetAllHousesAsync();
            return Ok(houses);
        }

        [HttpGet("{houseId}")]
        public async Task<IActionResult> GetHouseByIdAsync(int houseId)
        {
            var house = await _houseService.GetHouseByIdAsync(houseId);
            if (house == null)
            {
                return NotFound();
            }

            return Ok(house);
        }

        [HttpPost]
        public async Task<IActionResult> CreateHouseAsync([FromBody] HouseCreateDto houseDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var house = await _houseService.CreateHouseAsync(houseDto);
                    return Ok(house);
                }
                return BadRequest("ModelState is not valid");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{houseId}")]
        public async Task<IActionResult> UpdateHouseAsync(int houseId, [FromBody] HouseUpdateDto houseDto)
        {
            try
            {
                var result = await _houseService.UpdateHouseAsync(houseId, houseDto);
                if (!result)
                {
                    return NotFound($"No house found with ID {houseId}");
                }

                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{houseId}")]
        public async Task<IActionResult> RemoveHouseAsync(int houseId)
        {
            try
            {
                var result = await _houseService.RemoveHouseAsync(houseId);
                if (!result)
                {
                    return NotFound($"No house found with ID {houseId}");
                }

                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Add more methods here for additional functionalities as needed
    }
}
