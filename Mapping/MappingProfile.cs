using System.Linq;
using AutoMapper;
using CyouEcommerce.Controllers.Resources;
using CYouEcommerce.Core.EFTables;
using CYouEcommerce.Core.EFTables.Hardware;

namespace CYouEcommerce.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain to API Resource
            CreateMap<Case, KeyValuePairResource>();
            CreateMap<Coolingfan, KeyValuePairResource>();
            CreateMap<CPU, KeyValuePairResource>();
            CreateMap<GPU, KeyValuePairResource>();
            CreateMap<Motherboard, KeyValuePairResource>();
            CreateMap<Powersupply, KeyValuePairResource>();
            CreateMap<RAM, KeyValuePairResource>();
            CreateMap<Storage, KeyValuePairResource>();
            CreateMap<Account, AccountResource>();
            CreateMap<SaleItem, SaleItemResource>();              
            CreateMap<Order, OrderResource>();             
            CreateMap<Photo, PhotoResource>();     
        }
    }
}