using AutoMapper;
using Technical_Tests_Backend_Ssr.Models;
using Technical_Tests_Backend_Ssr.Models.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDTO>();
        CreateMap<UserDTO, User>();

        CreateMap<Client, ClientDTO>();
        CreateMap<ClientDTO, Client>();
    }
}