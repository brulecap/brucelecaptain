#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
	result = os.environ.get('DJANGO_SETTINGS_MODULE')
	if result is None:
		print("None")
	else:
		print("settings " + result)
#	print("settings_module" + os.environ.get('DJANGO_SETTINGS_MODULE'))
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio.settings")
	try:
		from django.core.management import execute_from_command_line
	except ImportError as exc:
		raise ImportError(
			"Couldn't import Django. Are you sure it's installed and "
			"available on your PYTHONPATH environment variable? Did you "
			"forget to activate a virtual environment?"
		) from exc
	execute_from_command_line(sys.argv)
