using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class Register : MonoBehaviour
{
    public Canvas[] panel;
    public InputField inputID;
    public InputField inputPW;
    public InputField InputName;
    public Button regbtn;
    Text infoText;
    public Text[] Myinfotext;
    public string[] userData;
    private int gold = 0;

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

    public void registerBtn()
    {
        StartCoroutine(ServerMakeUser());
    }
    public void goldSend()
    {

        StartCoroutine(GoldSend());
    }

    IEnumerator ServerLoginUser()
    {
        WWWForm form = new WWWForm();
        form.AddField("ID", inputID.text);
        form.AddField("PW", inputPW.text);
        UnityWebRequest www = UnityWebRequest.Post("http://localhost:3030/login_user", form);

        yield return www.Send();
        if (www.isNetworkError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Login Success");
            print(www.downloadHandler.text);

            string data = www.downloadHandler.text.Replace("{", "");
            data = data.Replace("}", "");
            data = data.Replace("\"", "");

            string[] val = data.Split(",");
            string[] val2;
            
            // 기준문자열.Replace("변경전값", "변경후값")
            for (int i = 0; i < val.Length; i++)
            {
                val2 = val[i].Split(":");
                Myinfotext[i].text = Myinfotext[i].text + val2[1];
                userData[i] = val2[1];
                print(val2[1]);
            }
            panel[0].gameObject.SetActive(false);
            panel[1].gameObject.SetActive(true);
            www.Dispose();
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

        }
    }

    IEnumerator GoldSend()
    {
        WWWForm form = new WWWForm();
        form.AddField("GoldSend", gold += 10);
        print(userData[0]);
        form.AddField("userno", userData[0]);
        UnityWebRequest www = UnityWebRequest.Post("http://localhost:3030/gold_send", form);

        yield return www.Send();
        www.uploadHandler.Dispose();
        if (www.isNetworkError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log(www.downloadHandler.text);
            //Myinfotext[5].text = 

        }
    }
    // Start is called before the first frame update

    void Start()
    {
        
    
    }



    // Update is called once per frame
    void Update()
    {
        
    }
}
