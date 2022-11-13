using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class Register : MonoBehaviour
{
    public InputField inputID;
    public InputField inputPW;
    public InputField InputName;
    public Button regbtn;
    public Text infoText;

    public class PacketData
    {
        public string url;
        public int userno;
    }

    public class UserData
    {
        public int userno;
        public string userid;
        public string userpw;
        public string username;
    }

    public void loginBtn()
    {
        StartCoroutine(ServerLoginUser());
    }
    IEnumerator ServerShowUser()
    {
        WWWForm form = new WWWForm();
        form.AddField("userno", inputID.text);
        UnityWebRequest www = UnityWebRequest.Post("http://localhost:3030/show_user", form);
        
        yield return www.Send();
        www.uploadHandler.Dispose();
        if (www.isNetworkError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log(www.downloadHandler.text);
            UserData data = JsonUtility.FromJson<UserData>(www.downloadHandler.text);
            Debug.Log("ID :" + data.userid + ", PASSWORD :" + data.userpw + ",Name :" + data.username);
            //infoText.text = "ID:" + data.userid + "\\PASSWORD:" + data.userpw + "\\Name:" + data.username;
        }
    }
    IEnumerator ServerLoginUser()
    {
        WWWForm form = new WWWForm();
        form.AddField("ID", inputID.text);
        form.AddField("PW", inputPW.text);
        UnityWebRequest www = UnityWebRequest.Post("http://localhost:3030/show_user", form);

        yield return www.Send();
        if (www.isNetworkError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Login Success");
            print(www.downloadHandler.text);
            UserData data = JsonUtility.FromJson<UserData>(www.downloadHandler.text);
            Debug.Log("ID :" + data.userid + ", PASSWORD :" + data.userpw + ",Name :" + data.username);
            //infoText.text = "ID:" + data.userid + "\\PASSWORD:" + data.userpw + "\\Name:" + data.username;
        }

    }
    IEnumerator ServerMakeUser()
    {
        WWWForm form = new WWWForm();
        form.AddField("ID", inputID.text);
        form.AddField("PW", inputPW.text);
        form.AddField("NAME", InputName.text);

        UnityWebRequest www = UnityWebRequest.Post("http://localhost:3030/make_user", form);
        
        yield return www.Send();

        if (www.isNetworkError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log(www.downloadHandler.text);
            PacketData data = JsonUtility.FromJson<PacketData>(www.downloadHandler.text);
            PlayerPrefs.SetInt("userno", data.userno);
            PlayerPrefs.Save();
        }
    }
    // Start is called before the first frame update
    public void registerBtn()
    {
        StartCoroutine(ServerMakeUser());
    }
    void Start()
    {
        
    
    }



    // Update is called once per frame
    void Update()
    {

    }
}
