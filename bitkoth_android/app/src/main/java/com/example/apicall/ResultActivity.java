package com.example.apicall;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;

public class ResultActivity extends AppCompatActivity {
    private ListView listView;
    private ArrayList<com.example.passwordlistactivity.Password> passwordList;
    private String email;  // Add a field to store the email

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        listView = findViewById(R.id.listView);
        passwordList = new ArrayList<>();

        // Retrieve data from the intent
        Intent intent = getIntent();
        email = intent.getStringExtra("email");
        String masterPassword = intent.getStringExtra("masterPassword");

        // Replace with your actual API endpoint
        String apiUrl = "https://bitkoth.onrender.com/api/get-all-passwords";

        // Create parameters for the POST request
        JSONObject params = new JSONObject();
        try {
            params.put("email", email);
            params.put("masterPassword", masterPassword);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        RequestQueue reqQueue = Volley.newRequestQueue(this);

        // Create a JsonObjectRequest with POST method
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, apiUrl, params,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d("API Response", response.toString());

                        try {
                            JSONArray jsonArray = response.getJSONArray("passwords");

                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject jsonPassword = jsonArray.getJSONObject(i);

                                com.example.passwordlistactivity.Password password = new com.example.passwordlistactivity.Password(
                                        jsonPassword.getString("name"),
                                        jsonPassword.getString("password")
                                );

                                passwordList.add(password);
                            }

                            // Display results in ListView
                            ArrayAdapter<com.example.passwordlistactivity.Password> adapter = new ArrayAdapter<>(ResultActivity.this, android.R.layout.simple_list_item_1, passwordList);
                            listView.setAdapter(adapter);

                            // Make ListView items clickable
                            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                                @Override
                                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                                    com.example.passwordlistactivity.Password selectedPassword = passwordList.get(position);

                                    // Start EditPasswordActivity and pass the selected password details
                                    Intent editIntent = new Intent(ResultActivity.this, EditPasswordActivity.class);
                                    editIntent.putExtra("email", email);
                                    editIntent.putExtra("passwordName", selectedPassword.getName());
                                    editIntent.putExtra("passwordValue", selectedPassword.getPassword());
                                    editIntent.putExtra("arrayIndex", position);
                                    startActivity(editIntent);
                                }
                            });
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Volley Sample Fail", error.getMessage());
                    }
                });

        reqQueue.add(request);
    }
}
