using AutoMapper;
using PRN231_Project.Dto.House;
using PRN231_Project.Dto.Permission;
using PRN231_Project.Repositories;

namespace PRN231_Project.Services.Impl
{
	public class PermissionService : IPermissionService
	{
		private readonly IPermissionRepository _repository;
		private readonly IMapper _mapper;

		public PermissionService(IPermissionRepository repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}
		public async Task<IEnumerable<PermissionDto>> GetAllPermissionAsync()
		{
			var permissions = await _repository.GetAllPermissionAsync();
			return _mapper.Map<IEnumerable<PermissionDto>>(permissions);
		}
	}
}
