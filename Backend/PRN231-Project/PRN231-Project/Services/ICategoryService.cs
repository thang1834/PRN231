using PRN231_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using PRN231_Project.Dto.Category;

namespace PRN231_Project.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
        Task<CategoryDto> GetCategoryByIdAsync(int categoryId);
    }
}
