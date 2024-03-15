namespace PRN231_Project.Dto.Transaction
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public string? Tid { get; set; }
        public string? Description { get; set; }
        public decimal? Amount { get; set; }
        public decimal? CusumBalance { get; set; }
        public string? When { get; set; }
        public string? BankSubAccId { get; set; }
        public string? SubAccId { get; set; }
        public string? VirtualAccount { get; set; }
        public string? VirtualAccountName { get; set; }
        public string? CorresponsiveName { get; set; }
        public string? CorresponsiveAccount { get; set; }
        public string? CorresponsiveBankId { get; set; }
        public string? CorresponsiveBankName { get; set; }
    }
}
