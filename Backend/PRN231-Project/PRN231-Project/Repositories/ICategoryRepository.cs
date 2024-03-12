using PRN231_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int categoryId);
    }
}
