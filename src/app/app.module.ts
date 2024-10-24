import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule} from '@angular/fire/compat';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp({"projectId":"recetario-cf1b2","appId":"1:331554652313:web:806f621487d191c4d6b808","storageBucket":"recetario-cf1b2.appspot.com","apiKey":"AIzaSyAXeH3qOydqyeDdy3b2PndwHE8gKHTzP4s","authDomain":"recetario-cf1b2.firebaseapp.com","messagingSenderId":"331554652313","measurementId":"G-H5WZJ8872Z"})),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
