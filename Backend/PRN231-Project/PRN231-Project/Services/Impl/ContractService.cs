
using PRN231_Project.Dto.Contract;

namespace PRN231_Project.Services.Impl
{
    public class ContractService : IContractService
    {
        public Task CreateContractAsync(ContractCreateDto contractDto)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ContractDto>> GetAllContractsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ContractDto> GetContractByIdAsync(int contractId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ContractDto>> GetContractsByHouseIdAsync(int houseId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ContractDto>> GetContractsByUserIdAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ContractDto>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            throw new NotImplementedException();
        }

        public Task RemoveContractAsync(int contractId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateContractAsync(int contractId, ContractUpdateDto contractDto)
        {
            throw new NotImplementedException();
        }
    }
}
