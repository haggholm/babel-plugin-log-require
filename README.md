# babel-plugin-log-require

Inserts `console.log` statements at the top and bottom of each module, and also
measures the time to load each module. This can be useful to diagnose slow-loading
applications and understand what gets included.

Obviously absolutely inappropriate for production builds, this is a debug tool.
