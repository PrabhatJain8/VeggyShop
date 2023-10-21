using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FreshVeggies.Controllers
{
	[Route("[controller]")]

	[ApiController]
	public class CartController : Controller
	{	
		private readonly ICartRepository _cartRepository;
		public CartController(ICartRepository cartRepository)
		{
			_cartRepository = cartRepository;

		}
		[HttpGet("{user}")]
		public async Task<List<Cart>>GetCart(string user)
		{
			return await  _cartRepository.GetMyCart(user);
		}

		[HttpGet("{user}/TotalItems")]
		public async Task<int>TotalItems(string user)
		{
			return await _cartRepository.GetTotalItems(user);
		}

		[HttpGet("{user}/SubTotal")]
		public async Task<int>Subtotal(string user)
		{
			return await _cartRepository.GetTotal(user);
		}

		[HttpPost("Add")]
		public async Task<bool> AddCart([FromBody] Cart cart)
		{
			var isAdded = _cartRepository.AddToCart(cart);
			return true;
		}


		[HttpDelete("{id}")]
		public async Task<IActionResult> RemoveCart(int id)
		{
			var isRemoved = await _cartRepository.RemoveFromCart(id);
			if (isRemoved == false)
			{
				return BadRequest("unable to delete");
			}
			return NoContent();
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateQuantity(int id,[FromBody] Cart cart)
		{
			var isUpdated = await _cartRepository.Update(id, cart);
			if (isUpdated == false)
			{
				return BadRequest("unable to update");
			}
			return Ok(cart);

		}

		[HttpGet("{user}/ConfirmOrder")]
		public async Task<bool>OrderConfirm(string user)
		{
			return await _cartRepository.ConfirmOrder(user);
		}


	}
}
