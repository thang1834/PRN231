using AutoMapper;
using Microsoft.Extensions.Hosting;
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
        private readonly IWebHostEnvironment _environment;
        public ContractService(IContractRepository repository, IMapper mapper, IWebHostEnvironment environment)
        {
            _repository = repository;
            _mapper = mapper;
            _environment = environment;
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

        /*public async Task<IEnumerable<ContractDto>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var contracts = await _repository.GetContractsInDateRangeAsync(startDate, endDate);
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }*/

        public async Task<Contract> CreateContractAsync(ContractCreateDto contractDto)
        {
            string fileImage = "";
            try
            {               
                string fileName = $"{DateTime.Now.Ticks}_{contractDto.ImageUpload.FileName}";
                fileImage = fileName;
                string filePath = Path.Combine(_environment.WebRootPath, "uploads" , "images", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await contractDto.ImageUpload.CopyToAsync(fileStream);
                }
                var contract = _mapper.Map<Contract>(contractDto);
                contract.FilePath = Path.Combine("uploads", "images", fileName);
                return await _repository.AddContractAsync(contract);
            }
            catch (Exception ex)
            {
                if (!string.IsNullOrEmpty(fileImage))
                {
                    string filePath = Path.Combine(_environment.WebRootPath, "uploads" , "images", fileImage);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
                throw new Exception(ex.Message);
            }
        }

        public async Task<Contract> UpdateContractAsync(int contractId, ContractUpdateDto contractDto)
        {
            var existingContract = await _repository.GetContractByIdAsync(contractId);
            if (existingContract == null)
            {
                throw new Exception("Contract not found");
            }
            string fileImage = "";
            try
            {
                _mapper.Map(contractDto, existingContract);
                if (contractDto.ImageUpload != null)
                {
                    string fileName = $"{DateTime.Now.Ticks}_{contractDto.ImageUpload.FileName}";
                    fileImage = fileName;
                    string filePath = Path.Combine(_environment.WebRootPath, "uploads", "images", fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await contractDto.ImageUpload.CopyToAsync(fileStream);
                    }

                    var fileExist = Path.Combine(_environment.WebRootPath, existingContract.FilePath);
                    if (System.IO.File.Exists(fileExist))
                    {
                        System.IO.File.Delete(fileExist);
                    }
                    existingContract.FilePath = Path.Combine("uploads", "images", fileImage);
                }
                
                return await _repository.UpdateContractAsync(existingContract);
            }
            catch (Exception ex)
            {
                if (!string.IsNullOrEmpty(fileImage))
                {
                    string filePath = Path.Combine(_environment.WebRootPath, "uploads", "images", fileImage);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<Contract> RemoveContractAsync(int contractId)
        {
            try
            {
                var deletedContract = await _repository.RemoveContractAsync(contractId);
                string filePath = Path.Combine(_environment.WebRootPath, deletedContract.FilePath);
                if (System.IO.File.Exists(filePath))
                {
                    
                    System.IO.File.Delete(filePath);    
                }
                return deletedContract;
            }
            catch(Exception ex) {
                throw new Exception(ex.Message);
            }         
        }
    }
}
