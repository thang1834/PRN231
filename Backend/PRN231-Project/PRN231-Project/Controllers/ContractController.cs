using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Dto.Contract;
using PRN231_Project.Services;

namespace PRN231_Project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContractController : Controller
    {
        private readonly IContractService _contractService;

        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContractsAsync()
        {
            var contracts = await _contractService.GetAllContractsAsync();
            return Ok(contracts);
        }

        [HttpGet("{contractId}")]
        public async Task<IActionResult> GetContractByIdAsync(int contractId)
        {
            var contract = await _contractService.GetContractByIdAsync(contractId);
            if (contract == null)
            {
                return NotFound();
            }

            return Ok(contract);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetContractsByUserIdAsync(int userId)
        {
            var contracts = await _contractService.GetContractsByUserIdAsync(userId);
            return Ok(contracts);
        }

        [HttpGet("house/{houseId}")]
        public async Task<IActionResult> GetContractsByHouseIdAsync(int houseId)
        {
            var contracts = await _contractService.GetContractsByHouseIdAsync(houseId);
            return Ok(contracts);
        }

        /*[HttpGet("date-range")]
        public async Task<IActionResult> GetContractsInDateRangeAsync([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var contracts = await _contractService.GetContractsInDateRangeAsync(startDate, endDate);
            return Ok(contracts);
        }*/

        [HttpPost]
        public async Task<IActionResult> CreateContractAsync([FromForm] ContractCreateDto contractDto)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var contract = await _contractService.CreateContractAsync(contractDto);
                    return Ok(contract);
                }
                return BadRequest("ModelState is not valid");
                
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPut("{contractId}")]
        public async Task<IActionResult> UpdateContractAsync(int contractId, [FromForm] ContractUpdateDto contractDto)
        {
            try
            {
                await _contractService.UpdateContractAsync(contractId, contractDto);
                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{contractId}")]
        public async Task<IActionResult> RemoveContractAsync(int contractId)
        {
            try
            {
                await _contractService.RemoveContractAsync(contractId);
                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
