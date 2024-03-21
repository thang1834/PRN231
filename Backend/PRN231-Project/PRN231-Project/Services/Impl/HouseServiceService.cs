using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using PRN231_Project.Dto.HouseService;
using PRN231_Project.Models;
using PRN231_Project.Repositories;

namespace PRN231_Project.Services.Impl
{
    public class HouseServiceService : IHouseServiceService
    {
        private readonly IHouseServiceRepository _repository;
        private readonly IHouseRepository _houseRepository;
        private readonly IMapper _mapper;

        public HouseServiceService(IHouseServiceRepository repository, IMapper mapper, IHouseRepository houseRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _houseRepository = houseRepository;
        }

        public async Task<IEnumerable<ServiceDto>> GetAllServicesAsync()
        {
            var services = await _repository.GetAllServicesAsync(); 
            return _mapper.Map<List<ServiceDto>>(services);
        }

        public async Task<ServiceDto> GetServiceByIdAsync(int serviceId)
        {
            return _mapper.Map<ServiceDto>(await _repository.GetServiceByIdAsync(serviceId));
        }

        public async Task<ServiceDto> AddServiceAsync(ServiceCreateDto service)
        {
            var newService = await _repository.AddServiceAsync(_mapper.Map<Service>(service));
            return _mapper.Map<ServiceDto>(newService);
        }

        public async Task<ServiceDto> UpdateServiceAsync(int serviceId, ServiceUpdateDto service)
        {
            var existingService = await _repository.GetServiceByIdAsync(serviceId);
            if (existingService == null)
            {
                throw new Exception("Service not found");
            }
            _mapper.Map(service, existingService);
            var updatedService = await _repository.UpdateServiceAsync(existingService);
            return _mapper.Map<ServiceDto>(updatedService);
        }

        public async Task<bool> RemoveServiceAsync(int serviceId)
        {
            return await _repository.RemoveServiceAsync(serviceId);
        }

        public async Task<List<ServiceDto>> GetServicesByHouseIdAsync(int houseId)
        {
            var listService = await _repository.GetServicesByHouseIdAsync(houseId);
            return _mapper.Map<List<ServiceDto>>(listService);
        }

        public async Task<List<ServiceDto>> SetServicesForHouseAsync(HouseServicesDto h)
        {
            try
            {
                var house = await _houseRepository.GetHouseByIdAsyncWithServices(h.HouseId);
                if (house == null)
                {
                    throw new ArgumentNullException("House does not exist");
                }
                house.Services = new List<Service>();
                foreach (int id in h.ListServicesId)
                {
                    var service = await _repository.GetServiceByIdAsync(id);
                    if (service != null)
                    {
                        house.Services.Add(service);
                    }
                }
                await _houseRepository.UpdateHouseAsync(house);
                return _mapper.Map<List<ServiceDto>> (house.Services.ToList());
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
            
        }
    }
}
