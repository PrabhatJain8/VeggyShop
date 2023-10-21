using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FreshVeggies.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class AuthenticateController : Controller
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;

		public AuthenticateController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_configuration = configuration;
		}


		[HttpPost]
		[Route("RegisterUser")]
		public async Task<IActionResult> Register([FromBody] Register model)
		{
			var userExists = await _userManager.FindByNameAsync(model.userName);
			var emailExists = await _userManager.FindByEmailAsync(model.email);
			if (userExists != null)
			{
				return BadRequest("UserName Already exist!");
			}
			if (emailExists != null)
			{
				return BadRequest("Email already exist!");
			}

			IdentityUser user = new ()
			{
				Email = model.email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = model.userName
			};
			var result = await _userManager.CreateAsync(user, model.password);
			if (!result.Succeeded)
				return  BadRequest("User creation failed! Please check user details and try again.");

			if (!await _roleManager.RoleExistsAsync("User"))
				await _roleManager.CreateAsync(new IdentityRole("User"));

			if (await _roleManager.RoleExistsAsync("User"))
			{
				await _userManager.AddToRoleAsync(user, "User");
			}
			return Ok(model);

		}

		[HttpPost]
		[Route("RegisterAdmin")]
		public async Task<IActionResult> RegisterAdmin([FromBody] Register model)
		{
			var userExists = await _userManager.FindByNameAsync(model.userName);
			var emailExists = await _userManager.FindByEmailAsync(model.email);
			if (userExists != null)
			{
				return BadRequest("UserName Already exist!");
			}
			if (emailExists != null)
			{
				return BadRequest("Email already exist!");
			}

			IdentityUser user = new()
			{
				Email = model.email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = model.userName,
				
			};
			var result = await _userManager.CreateAsync(user, model.password);
			if (!result.Succeeded)
				return BadRequest("User creation failed! Please check user details and try again.");

			if (!await _roleManager.RoleExistsAsync("Admin"))
				await _roleManager.CreateAsync(new IdentityRole("Admin"));

			if (await _roleManager.RoleExistsAsync("Admin"))
			{
				await _userManager.AddToRoleAsync(user, "Admin");
			}
			return Ok(model);

		}

		[HttpPost]
		[Route("Login")]
		public async Task<IActionResult> Login([FromBody] Login model)
		{
			var user = await _userManager.FindByEmailAsync(model.email);
			if (user != null && await _userManager.CheckPasswordAsync(user, model.password))
			{
				var userRoles = await _userManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
					new Claim("UserName", user.UserName),
					new Claim("UserEmail", user.Email),
					
				};

				foreach (var userRole in userRoles)
				{
					authClaims.Add(new Claim(ClaimTypes.Role, userRole));
				}

				var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

				var token = new JwtSecurityToken(
					issuer: _configuration["JWT:ValidIssuer"],
					audience: _configuration["JWT:ValidAudience"],
					claims: authClaims,
					expires: DateTime.Now.AddMinutes(60),
					signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
					);

				return Ok(new
				{
					token = new JwtSecurityTokenHandler().WriteToken(token),
				});
			}
			return Unauthorized();
		}
	}
}
