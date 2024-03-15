namespace PRN231_Project.Dto.Transaction
{
    public class TransactionResponse
    {
        public int Error { get; set; }
        public List<TransactionDto> Data { get; set; }
        public TransactionResponse()
        {
            Error = 0;
            Data = new List<TransactionDto>();
        }
    }
}
