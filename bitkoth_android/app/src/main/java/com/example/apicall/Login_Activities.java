package com.example.apicall;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class Login_Activities extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_activities);

        // Find the button with ID addPasswordButton in activity_login_activities.xml
        Button addPasswordButton = findViewById(R.id.addPasswordButton);

        // Set up click listener for the addPasswordButton
        addPasswordButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to RNG activity
                Intent intent = new Intent(Login_Activities.this, RNG.class);
                intent.putExtra("email", getIntent().getStringExtra("email"));
                startActivity(intent);
            }
        });

        // Find the button with ID getAllPasswordsButton in activity_login_activities.xml
        Button getAllPasswordsButton = findViewById(R.id.getAllPasswordsButton);

        // Set up click listener for the getAllPasswordsButton
        getAllPasswordsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to MainActivity2
                Intent intent = new Intent(Login_Activities.this, MainActivity2.class);
                intent.putExtra("email", getIntent().getStringExtra("email"));
                startActivity(intent);
            }
        });
    }
}
