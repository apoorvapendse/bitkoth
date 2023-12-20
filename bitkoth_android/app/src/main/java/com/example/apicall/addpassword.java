// THIS IS PASSWORD ADDITION
package com.example.apicall;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class addpassword extends AppCompatActivity {

    private EditText emailEdt, passwordNameEdt, passwordValueEdt;
    private Button postDataBtn, previousBtn;
    private TextView responseTV;    
    private ProgressBar loadingPB;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addpassword);
        EditText emailEditText = findViewById(R.id.idEdtEmail);

        emailEdt = findViewById(R.id.idEdtEmail);
        passwordNameEdt = findViewById(R.id.idEdtPasswordName);
        passwordValueEdt = findViewById(R.id.idEdtPasswordValue);
        postDataBtn = findViewById(R.id.idBtnPost);
        responseTV = findViewById(R.id.idTVResponse);
        loadingPB = findViewById(R.id.idLoadingPB);
        previousBtn = findViewById(R.id.idBtnPrevious);

        postDataBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (emailEdt.getText().toString().isEmpty() ||
                        passwordNameEdt.getText().toString().isEmpty() ||
                        passwordValueEdt.getText().toString().isEmpty()) {
                    Toast.makeText(addpassword.this, "Please enter all the values", Toast.LENGTH_SHORT).show();
                    return;
                }
                postDataUsingVolley(
                        emailEdt.getText().toString(),
                        passwordNameEdt.getText().toString(),
                        passwordValueEdt.getText().toString()
                );
            }
        });

        previousBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate back to the previous activity (you may replace this logic with your actual flow)
                finish();
            }
        });
    }

    private void postDataUsingVolley(String email, String passwordName, String passwordValue) {
        String url = "https://bitkoth.onrender.com/api/add-password";
        loadingPB.setVisibility(View.VISIBLE);

        RequestQueue queue = Volley.newRequestQueue(addpassword.this);

        StringRequest request = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        loadingPB.setVisibility(View.GONE);
                        Log.d("Response", response);

                        try {
                            JSONObject respObj = new JSONObject(response);

                            // Check if the response contains the "message" key
                            if (respObj.has("message")) {
                                String message = respObj.getString("message");

                                // Display the message in responseTV
                                responseTV.setText(message);
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        loadingPB.setVisibility(View.GONE);
                        // Display the error message in responseTV
                        responseTV.setText("Error: " + error.getMessage());
                    }
                }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();

                params.put("email", email);
                params.put("passwordName", passwordName);
                params.put("passwordValue", passwordValue);

                return params;
            }
        };

        queue.add(request);
    }
}
