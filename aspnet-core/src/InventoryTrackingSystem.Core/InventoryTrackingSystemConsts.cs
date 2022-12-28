using InventoryTrackingSystem.Debugging;

namespace InventoryTrackingSystem
{
    public class InventoryTrackingSystemConsts
    {
        public const string LocalizationSourceName = "InventoryTrackingSystem";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "05a2c52f1e1e40fd9d01b661f2ed7b66";
    }
}
