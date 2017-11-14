### How to test:
- Add in /etc/hosts:
```
127.0.0.1 firstdomain.dev
127.0.0.1 seconddomain.dev
127.0.0.1 server.dev
```
- Inside client folder, run this command: `ruby -run -e httpd . -p 8000`;
- Inside server folder, run this command: `ruby app.rb`
- Open browser and go to: http://firstdomain.dev:8000/
- Open in another tab browser the url: http://seconddomain.dev:8000/

Check if the same Cookie ID was displayed.
