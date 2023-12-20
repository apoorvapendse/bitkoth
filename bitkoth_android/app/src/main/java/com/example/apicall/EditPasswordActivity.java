package com.example.apicall;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.Map;

public class EditPasswordActivity extends AppCompatActivity {

    private EditText newPasswordEditText;
    private Button updatePasswordButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_password);

        newPasswordEditText = findViewById(R.id.editTextNewPassword);
        updatePasswordButton = findViewById(R.id.buttonUpdatePassword);

        updatePasswordButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Assuming you have the email, passwordName, passwordValue, and arrayIndex
                String email = getIntent().getStringExtra("email");
                String passwordName = getIntent().getStringExtra("passwordName");
                String passwordValue = getIntent().getStringExtra("passwordValue");
                int arrayIndex = getIntent().getIntExtra("arrayIndex", -1);

                String newPassword = newPasswordEditText.getText().toString();
                if (!newPassword.isEmpty()) {
                    // Call method to update the password
                    updatePassword(email, passwordName, passwordValue, newPassword, arrayIndex);
                } else {
                    Toast.makeText(EditPasswordActivity.this, "Please enter a new password", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    private void updatePassword(String email, String passwordName, String passwordValue, String newPassword, int arrayIndex) {
        // Log the parameters
        Log.d("UpdatePassword", "Email: " + email);
        Log.d("UpdatePassword", "PasswordName: " + passwordName);
        Log.d("UpdatePassword", "PasswordValue: " + passwordValue);
        Log.d("UpdatePassword", "NewPassword: " + newPassword);
        Log.d("UpdatePassword", "ArrayIndex: " + arrayIndex);

        // API endpoint for updating passwords
        String url = "https://bitkoth.onrender.com/api/edit-password";

        RequestQueue queue = Volley.newRequestQueue(this);

        StringRequest request = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Handle the response, e.g., display a success message
                        Toast.makeText(EditPasswordActivity.this, "Password updated successfully", Toast.LENGTH_SHORT).show();
                        finish(); // Close the activity after updating
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // Handle errors, e.g., display an error message
                        Toast.makeText(EditPasswordActivity.this, "Error updating password", Toast.LENGTH_SHORT).show();
                        Log.e("Volley Error", "Error updating password: " + error.getMessage());
                    }
                }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();
                params.put("arrayIndex", String.valueOf(arrayIndex));

                // Check and add non-null parameters
                if (email != null) {
                    params.put("email", email);
                }
                if (passwordName != null) {
                    params.put("passwordName", passwordName);
                }
                if (newPassword != null) {
                    // Overwrite passwordValue with newPassword
                    params.put("passwordValue", newPassword);
                }

                // Log the parameters before returning
                Log.d("UpdatePassword", "Params: " + params);

                return params;
            }
        };

        queue.add(request);
    }
}
