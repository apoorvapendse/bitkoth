package com.example.apicall;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity2 extends AppCompatActivity {
    private EditText emailEditText, masterPasswordEditText;
    private Button submitButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        // Find views by their IDs
        emailEditText = findViewById(R.id.emailEditText);
        masterPasswordEditText = findViewById(R.id.masterPasswordEditText);
        submitButton = findViewById(R.id.submitButton);

        // Check if the intent that started this activity contains an email
        Intent intent = getIntent();
        if (intent != null && intent.hasExtra("email")) {
            String email = intent.getStringExtra("email");
            emailEditText.setText(email);
        }

        // Set up click listener for the submitButton
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Get user input from EditText fields
                String email = emailEditText.getText().toString();
                String masterPassword = masterPasswordEditText.getText().toString();

                // Pass data to the next activity
                Intent intent = new Intent(MainActivity2.this, ResultActivity.class);
                intent.putExtra("email", email);
                intent.putExtra("masterPassword", masterPassword);
                startActivity(intent);
            }
        });
    }
}
