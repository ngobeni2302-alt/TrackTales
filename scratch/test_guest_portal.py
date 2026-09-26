"""
Automated Test Suite for TrackTales Guest Portal & Redirection
Verifies:
1. FastAPI /guest and /guest.html endpoints return HTTP 200 FileResponse with guest.html.
2. All 21 attraction videos from the videos/ directory are properly linked in guest.html.
3. index.html guest buttons and handlers trigger the redirect to guest.html.
"""

import unittest
import os
import re
from fastapi.testclient import TestClient

import main
from main import app, static_dir

class TestGuestPortal(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        cls.guest_html_path = os.path.join(static_dir, "guest.html")

    def test_01_guest_html_file_exists(self):
        """Verify that public/guest.html exists in static directory."""
        self.assertTrue(os.path.exists(self.guest_html_path), "public/guest.html does not exist!")

    def test_02_fastapi_guest_route(self):
        """Verify that /guest route returns HTTP 200 with HTML content."""
        response = self.client.get("/guest")
        self.assertEqual(response.status_code, 200)
        self.assertIn("text/html", response.headers.get("content-type", ""))
        self.assertIn("Guest Passenger Portal", response.text)

    def test_03_fastapi_guest_html_route(self):
        """Verify that /guest.html route returns HTTP 200 with HTML content."""
        response = self.client.get("/guest.html")
        self.assertEqual(response.status_code, 200)
        self.assertIn("text/html", response.headers.get("content-type", ""))
        self.assertIn("Guest Passenger Portal", response.text)

    def test_04_attraction_videos_coverage(self):
        """Verify that all 21 attraction MP4 videos exist and are listed in guest.html."""
        videos_dir = os.path.join(static_dir, "videos")
        expected_videos = [
            "01_Gods_Window_Panorama_Route.mp4",
            "02_Drakensberg_Cliff_Viewpoint.mp4",
            "03_Robben_Island_and_Table_Mountain.mp4",
            "04_Boulders_Beach_Penguins.mp4",
            "05_Cape_of_Good_Hope.mp4",
            "06_Namaqualand_Wildflowers_Windmill.mp4",
            "07_Blyde_River_Canyon_Three_Rondavels.mp4",
            "08_Cradle_of_Humankind_Maropeng.mp4",
            "09_Sun_City_Palace_of_Lost_City.mp4",
            "10_Drakensberg_Amphitheatre_Hiking_Trail.mp4",
            "11_Augrabies_Falls_Orange_River_Gorge.mp4",
            "12_Apartheid_Museum_Johannesburg.mp4",
            "13_Elephants_River_Delta_Aerial.mp4",
            "14_Cango_Caves.mp4",
            "15_Garden_Route_Coastal_Road.mp4",
            "16_Constitutional_Court_Constitution_Hill.mp4",
            "17_VA_Waterfront_Cape_Town.mp4",
            "18_Table_Mountain_Sunset_Lions_Head.mp4",
            "19_Mandela_House_Soweto.mp4",
            "20_Pilanesberg_Game_Reserve_Entrance.mp4",
            "21_Addo_Elephant_Park_Safari.mp4"
        ]

        with open(self.guest_html_path, "r", encoding="utf-8") as f:
            content = f.read()

        for video_filename in expected_videos:
            video_path = os.path.join(videos_dir, video_filename)
            self.assertTrue(os.path.exists(video_path), f"Video file missing from filesystem: {video_filename}")
            self.assertIn(video_filename, content, f"Video {video_filename} not referenced in guest.html!")

    def test_05_index_html_guest_redirection(self):
        """Verify that index.html contains guest buttons and TrackTalesEnterGuestMode redirect."""
        index_html_path = os.path.join(static_dir, "index.html")
        with open(index_html_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("TrackTalesEnterGuestMode", content)
        self.assertIn("guest.html", content)
        self.assertIn("splash-guest-btn", content)

if __name__ == "__main__":
    unittest.main()
