using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace InventoryTrackingSystem.Localization
{
    public static class InventoryTrackingSystemLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(InventoryTrackingSystemConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(InventoryTrackingSystemLocalizationConfigurer).GetAssembly(),
                        "InventoryTrackingSystem.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
