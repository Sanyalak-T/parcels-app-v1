<configuration>
  <system.webServer>
    <handlers>
      <add
        name="iisnode"
        path="app.js"
        verb="*"
        modules="iisnode"
      />
    </handlers>
    <rewrite>
      <rules>
        <rule name="sendToNode">
          <match url="/*" />
          <action type="Rewrite" url="app.js" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>;
