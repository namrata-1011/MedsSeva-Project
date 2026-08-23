const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('@expo/config-plugins');

module.exports = function withRazorpayNamespace(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const razorpayBuildGradlePath = path.join(
        config.modRequest.projectRoot,
        'node_modules',
        'react-native-razorpay',
        'android',
        'build.gradle'
      );

      if (fs.existsSync(razorpayBuildGradlePath)) {
        let contents = fs.readFileSync(razorpayBuildGradlePath, 'utf-8');
        
        // Check if namespace is already added to prevent duplicates
        if (!contents.includes("namespace 'com.razorpay.rn'")) {
          // Find the android block and insert namespace
          contents = contents.replace(
            /android\s*\{/,
            "android {\n    namespace 'com.razorpay.rn'"
          );
          
          fs.writeFileSync(razorpayBuildGradlePath, contents, 'utf-8');
        }
      }

      return config;
    },
  ]);
};
