echo " BUILD START"
pip install -r requirements.txt
python3.11 manage.py collectstatic
echo " BUILD END"