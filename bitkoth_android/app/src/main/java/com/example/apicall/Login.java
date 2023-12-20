package com.example.apicall;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

public class Login extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        final EditText editTextEmail = findViewById(R.id.editTextEmail);
        Button buttonCheckPresence = findViewById(R.id.buttonCheckPresence);

        // Instantiate the RequestQueue.
        final RequestQueue queue = Volley.newRequestQueue(this);

        buttonCheckPresence.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Get the email entered by the user
                String email = editTextEmail.getText().toString().trim();

                // Check if the email is not empty
                if (!email.isEmpty()) {
                    // Define the URL with the entered email
                    String url = "https://bitkoth.onrender.com/api/check-presence?mail=" + email;

                    // Request a string response from the provided URL.
                    StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    // Handle the response here
                                    Log.d("Response", response);

                                    // If the response indicates user found, start login_activites
                                    if (response.contains("User Found")) {
                                        // Pass data to the next activity
                                        Intent intent = new Intent(Login.this, Login_Activities.class);
                                        intent.putExtra("email", email);
                                        startActivity(intent);
                                        finish(); // Close the current login activity
                                    } else {
                                        // Handle other response cases as needed
                                        Toast.makeText(Login.this, "User not found", Toast.LENGTH_SHORT).show();
                                    }

                                }
                            }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // Handle errors here
                            Log.e("Error", "Error occurred", error);
                            Toast.makeText(Login.this, "Error occurred", Toast.LENGTH_SHORT).show();
                        }
                    });

                    // Add the request to the RequestQueue.
                    queue.add(stringRequest);
                } else {
                    // Show an error or prompt the user to enter an email
                    // For simplicity, you can use a Toast message
                    Toast.makeText(Login.this, "Please enter an email", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
