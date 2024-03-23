﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Models;
using System.Transactions;
using PRN231_Project.Dto;
using PRN231_Project.Dto.Transaction;

namespace PRN231_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {

        private readonly HouseRentalContext _context;

        public TransactionController(HouseRentalContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Transaction([FromBody] TransactionResponse response)
        {
            var re = Request;
            var headers = re.Headers;

            try
            {
                if (headers["secure-token"] == "thangdz!!@123" && headers["Content-Type"] == "application/json")
                {
                    foreach (var item in response.Data)
                    {
                        {
                            //Add Transaction
                            var transactionEntity = new PRN231_Project.Models.Transaction
                            {
                                Id = item.Id,
                                Tid = item.Tid,
                                Description = item.Description,
                                Amount = item.Amount,
                                CusumBalance = item.CusumBalance,
                                When = item.When,
                                BankSubAccId = item.BankSubAccId,
                                SubAccId = item.SubAccId,
                                VirtualAccount = item.VirtualAccount,
                                VirtualAccountName = item.VirtualAccountName,
                                CorresponsiveName = item.CorresponsiveName,
                                CorresponsiveAccount = item.CorresponsiveAccount,
                                CorresponsiveBankId = item.CorresponsiveBankId,
                                CorresponsiveBankName = item.CorresponsiveBankName
                            };
                            await _context.Transactions.AddAsync(transactionEntity);
                            await _context.SaveChangesAsync();
                            foreach (var i in _context.Payments)
                            {
                                if (transactionEntity.Description.Trim().ToUpper() == i.Name.Trim().ToUpper())
                                {
                                    i.IsPaid = true;
                                    i.When = DateTime.Now;
                                    i.Tid = transactionEntity.Tid;
                                }
                            }
                            await _context.SaveChangesAsync();
                        }
                    }
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}