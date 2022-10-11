using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class Register : MonoBehaviour
{
    // Start is called before the first frame update
    
    private int port = 3030;
    IEnumerator UnityWebRequestGet()
    {
        string url = "localhost:3030";

        UnityWebRequest www = UnityWebRequest.Get(url);

        yield return www.SendWebRequest();

        if(www.error == null)
        {
            Debug.Log(www.downloadHandler.text);
        }
        else
        {
            Debug.Log("Error");
        }
    }
    void Start()
    {
        StartCoroutine(UnityWebRequestGet());
    }



// Update is called once per frame
void Update()
    {
        
    }
}
