using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Services;

namespace PRN231_Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly IContractService _contractService;
        private readonly IHouseService _houseService;

        public ChartController(IContractService contractService, IHouseService houseService)
        {
            _contractService = contractService;
            _houseService = houseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContractsAsync()
        {
            var contracts = await _contractService.GetAllContractsAsync();
            return Ok(contracts);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHousesAsync()
        {
            var houses = await _houseService.GetAllHousesAsync();
            return Ok(houses);
        }

    }
}
