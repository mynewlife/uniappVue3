## gradle版本gradle-6.9.2

### 下载gradle的一些依赖包
	gradle clean 或 gradlew clean

### 编译并打包
  * 生成Debug版本的apk文件
	gradle assembleDebug 或 gradlew assembleDebug

  * 生成Release版本的apk文件
	gradle assembleRelease 或 gradlew assembleRelease
	
### 打包目录
` app > build > outputs > apk > `

### 项目配置
* app > build.gradle
```
android {
	defaultConfig {
		/** 
		 * 新建项目修改包名（com.android.{修改}）
		 * 同步修改 app > src > main > AndroidManifest.xml
		 * 	<manifest package="com.android.{修改}">
		 *		<application>
		 *			<provider android:authorities="com.android.{修改}.dc.fileprovider"></provider>
		 *		</application>
		 *  </manifest>
		 */
		applicationId "com.android.simple"
    versionCode 100 // 应用的版本号（整数值）,建议与manifest.json中version -> code值一致
    versionName "1.0.0" //versionName为应用的版本名称（字符串）,建议与manifest.json中version -> name值一致

		/**
		 *app_key(uni-app开发者中心-我创建的应用-对应应用[包名对应]-离线打包key管理)
		 */
		manifestPlaceholders = [
      app_key:"7b66fed621d2b2933920d7da4fe874a2"
    ]
	}
	signingConfigs {
		config {
			//证书签名SHA1(用于申请AppKey) F5:1B:95:47:5F:79:3E:EF:82:7C:35:B4:86:61:06:CE:D9:A8:32:F5
			keyAlias 'testalias' // 证书别名
            keyPassword 'SmartChina2018' // 证书密码
            storeFile file('E:\\webList\\pda-app\\pda.keystore') // 证书文件位置- 也可是 jks格式
            storePassword 'SmartChina2018'
            v1SigningEnabled true
            v2SigningEnabled true
		}
	}
}
```


### 下面的都不用配置（除需要权限时权限配置）↓↓↓↓↓↓↓↓↓
# app > src > main > AndroidManifest.xml
```
<manifest>
	<!-- 权限配置 -->
	<uses-permission android:name="android.permission.CAMERA" />
	
	<!-- name为dcloud_appkey，value为申请的AppKey(uni-app开发者中心-我创建的应用-对应应用[包名对应]-离线打包key管理) -->
	<meta-data
        android:name="dcloud_appkey"
        android:value="c9214f9d7f17aa5ebd2e63732efe5c08" />
</manifest>
```

# app > src > main > assets
 * apps > __UNI__E38AA7D > www > uni-app打包后的文件
 __UNI__E38AA7D : uni-app 对应包名

 * data > dcloud_control.xml
 ```
 <hbuilder>
	<apps>
		<!-- __UNI__E38AA7D : uni-app 对应包名 -->
		<app appid="__UNI__E38AA7D" appver=""/>
	</apps>
</hbuilder>
 ``` 
 
# app > src > main > res
 * drawable  图标文件
 * values > strings.xml 
 ```
 <resources>
	<!-- padApp ：应用名称 -->
    <string name="app_name">padApp</string>
 </resources>
 ```
