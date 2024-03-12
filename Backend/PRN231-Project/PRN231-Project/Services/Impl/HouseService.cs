using AutoMapper;
using PRN231_Project.Dto.House;
using PRN231_Project.Models;
using PRN231_Project.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Services.Impl
{
    public class HouseService : IHouseService
    {
        private readonly IHouseRepository _repository;
        private readonly IMapper _mapper;

        public HouseService(IHouseRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HouseDto>> GetAllHousesAsync()
        {
            var houses = await _repository.GetAllHousesAsync();
            return _mapper.Map<IEnumerable<HouseDto>>(houses);
        }

        public async Task<HouseDto> GetHouseByIdAsync(int houseId)
        {
            var house = await _repository.GetHouseByIdAsync(houseId);
            return _mapper.Map<HouseDto>(house);
        }

        public async Task<House> CreateHouseAsync(HouseCreateDto houseDto)
        {
            try
            {
                var house = _mapper.Map<House>(houseDto);
                if (house.UserId == null)
                {
                    house.UserId = 1;
                }
                house.IsTenanted = house.UserId > 1;

                return await _repository.AddHouseAsync(house);
            }
            catch (Exception ex)
            {
                throw new Exception($"Creation failed: {ex.Message}");
            }
        }

        public async Task<bool> UpdateHouseAsync(int houseId, HouseUpdateDto houseDto)
        {
            var existingHouse = await _repository.GetHouseByIdAsync(houseId);
            if (existingHouse == null)
            {
                return false;
            }

            _mapper.Map(houseDto, existingHouse);
            if (existingHouse.UserId == null)
            {
                existingHouse.UserId = 1; 
            }
            existingHouse.IsTenanted = existingHouse.UserId > 1;

            await _repository.UpdateHouseAsync(existingHouse);
            return true;
        }



        public async Task<bool> RemoveHouseAsync(int houseId)
        {
            return await _repository.RemoveHouseAsync(houseId);
        }
    }
}
