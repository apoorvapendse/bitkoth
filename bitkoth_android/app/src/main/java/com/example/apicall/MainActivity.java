// THIS is SIGNUP
package com.example.apicall;

import android.content.Intent;
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
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private EditText nameEdt, jobEdt;
    private Button postDataBtn, previousBtn;
    private TextView responseTV;
    private ProgressBar loadingPB;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nameEdt = findViewById(R.id.idEdtName);
        jobEdt = findViewById(R.id.idEdtJob);
        postDataBtn = findViewById(R.id.idBtnPost);
        responseTV = findViewById(R.id.idTVResponse);
        loadingPB = findViewById(R.id.idLoadingPB);
        previousBtn = findViewById(R.id.idBtnPrevious);

        postDataBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (nameEdt.getText().toString().isEmpty() && jobEdt.getText().toString().isEmpty()) {
                    Toast.makeText(MainActivity.this, "Please enter both the values", Toast.LENGTH_SHORT).show();
                    return;
                }
                postDataUsingVolley(nameEdt.getText().toString(), jobEdt.getText().toString());
            }
        });
        previousBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate back to Login_Activities
                Intent intent = new Intent(MainActivity.this, Login_Activities.class);
                startActivity(intent);
            }
        });
    }


    private void postDataUsingVolley(String email, String masterPassword) {
        String url = "https://bitkoth.onrender.com/api/add-user";
        loadingPB.setVisibility(View.VISIBLE);

        RequestQueue queue = Volley.newRequestQueue(MainActivity.this);

        StringRequest request = new StringRequest(Request.Method.POST, url, new com.android.volley.Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                loadingPB.setVisibility(View.GONE);
                Log.d("Response", response);

                try {
                    JSONObject respObj = new JSONObject(response);

                    // Check if the response contains the "message" key
                    if (respObj.has("message")) {
                        String message = respObj.getString("message");

                        // Check if the message indicates that the user already exists
                        if (message.equalsIgnoreCase("User Already Exists!!!")) {
                            // Display a message in responseTV indicating that the user already exists
                            responseTV.setText("User already exists. Please use a different username.");

                            // You can also clear the name and job fields if needed
                            nameEdt.setText("");
                            jobEdt.setText("");
                        } else {
                            // Display the message in responseTV
                            responseTV.setText(message);
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }


        }, new com.android.volley.Response.ErrorListener() {
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
                params.put("masterPassword", masterPassword);

                return params;
            }
        };

        queue.add(request);
    }
}
