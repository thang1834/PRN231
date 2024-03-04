using AutoMapper;
using PRN231_Project.Dto.Contract;
using PRN231_Project.Models;
using PRN231_Project.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Services.Impl
{
    public class ContractService : IContractService
    {
        private readonly IContractRepository _repository;
        private readonly IMapper _mapper;

        public ContractService(IContractRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContractDto>> GetAllContractsAsync()
        {
            var contracts = await _repository.GetAllContractsAsync();
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task<ContractDto> GetContractByIdAsync(int contractId)
        {
            var contract = await _repository.GetContractByIdAsync(contractId);
            return _mapper.Map<ContractDto>(contract);
        }

        public async Task<IEnumerable<ContractDto>> GetContractsByUserIdAsync(int userId)
        {
            var contracts = await _repository.GetContractsByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task<IEnumerable<ContractDto>> GetContractsByHouseIdAsync(int houseId)
        {
            var contracts = await _repository.GetContractsByHouseIdAsync(houseId);
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task<IEnumerable<ContractDto>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var contracts = await _repository.GetContractsInDateRangeAsync(startDate, endDate);
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task<Contract> CreateContractAsync(ContractCreateDto contractDto)
        {
            try
            {
                var contract = _mapper.Map<Contract>(contractDto);
                return await _repository.AddContractAsync(contract);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Contract> UpdateContractAsync(int contractId, ContractUpdateDto contractDto)
        {
            var existingContract = await _repository.GetContractByIdAsync(contractId);
            if (existingContract == null)
            {
                // Xử lý khi không tìm thấy hợp đồng
                // Ví dụ: throw new NotFoundException("Contract not found");
            }

            _mapper.Map(contractDto, existingContract);
            return await _repository.UpdateContractAsync(existingContract);
        }

        public async Task<Contract> RemoveContractAsync(int contractId)
        {
            return await _repository.RemoveContractAsync(contractId);
        }
    }
}
