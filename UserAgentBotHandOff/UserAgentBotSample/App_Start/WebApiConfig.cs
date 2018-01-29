using UserAgentBot.CommandHandling;
using UserAgentBot.MessageRouting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net.Http.Headers;
using System.Web.Http;
using Underscore.Bot.MessageRouting;
using Underscore.Bot.MessageRouting.DataStore;

namespace UserAgentBot
{

    public static class WebApiConfig
    {
        public static MessageRouterManager MessageRouterManager
        {
            get;
            private set;
        }

        public static IMessageRouterResultHandler MessageRouterResultHandler
        {
            get;
            private set;
        }

        public static CommandMessageHandler CommandMessageHandler
        {
            get;
            private set;
        }

        public static BackChannelMessageHandler BackChannelMessageHandler
        {
            get;
            private set;
        }

        public static void Register(HttpConfiguration config)
        {
            // Json settings
            config.Formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.Indented;
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                Formatting = Newtonsoft.Json.Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
            };

            // Web API configuration and services
            config.EnableCors();
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            //config.SuppressDefaultHostAuthentication();
           // config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/octet-stream"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
            // Message routing
            MessageRouterManager = new MessageRouterManager(new LocalRoutingDataManager());
            MessageRouterResultHandler = new MessageRouterResultHandler();
            CommandMessageHandler = new CommandMessageHandler(MessageRouterManager, MessageRouterResultHandler);
            BackChannelMessageHandler = new BackChannelMessageHandler(MessageRouterManager.RoutingDataManager);
        }
    }
}
