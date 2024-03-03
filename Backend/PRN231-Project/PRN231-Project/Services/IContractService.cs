using PRN231_Project.Dto.Contract;
using PRN231_Project.Models;

namespace PRN231_Project.Services
{
    public interface IContractService
    {
        Task<IEnumerable<ContractDto>> GetAllContractsAsync();
        Task<ContractDto> GetContractByIdAsync(int contractId);
        Task<IEnumerable<ContractDto>> GetContractsByUserIdAsync(int userId);
        Task<IEnumerable<ContractDto>> GetContractsByHouseIdAsync(int houseId);
        Task<IEnumerable<ContractDto>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate);

        Task<Contract> CreateContractAsync(ContractCreateDto contractDto);
        Task<Contract> UpdateContractAsync(int contractId, ContractUpdateDto contractDto);
        Task<Contract> RemoveContractAsync(int contractId);
    }
}
