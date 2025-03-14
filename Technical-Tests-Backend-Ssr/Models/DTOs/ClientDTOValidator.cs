using FluentValidation;

namespace Technical_Tests_Backend_Ssr.Models.DTOs
{
    public class ClientDTOValidator : AbstractValidator<ClientDTO>
    {
        public ClientDTOValidator()
        {
            RuleFor(client => client.Name)
                .NotEmpty().WithMessage("El nombre es obligatorio")
                .Length(3, 50).WithMessage("Debe tener entre 3 y 50 caracteres");

            RuleFor(client => client.Email)
                .NotEmpty().WithMessage("El email es obligatorio")
                .EmailAddress().WithMessage("Debe ser un email válido");
        }
    }
}
