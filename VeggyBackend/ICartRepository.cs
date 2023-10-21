namespace FreshVeggies
{
	public interface ICartRepository
	{
		Task<bool>AddToCart(Cart cart);
		Task<bool>RemoveFromCart(int id);
		Task<List<Cart>> GetMyCart(string user);
		Task<int>GetTotalItems(string user);
		Task<int>GetTotal(string user);

		Task<bool>Update(int id, Cart cart);
		Task<bool>ConfirmOrder(string user);


	}
}
